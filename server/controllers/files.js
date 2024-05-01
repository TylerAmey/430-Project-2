const XLSX = require('xlsx');
const File = require('../models/filestore.js');

// A simple handler for rendering the upload page
const uploadPage = async (req, res) => {
  try {
    const query = { user: req.session.account._id };
    // console.log(query);
    const docs = await File.find(query).select('name data').lean().exec();
    console.log(docs);
    return res.render('upload', { files: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving files!' });
  }
};

const uploadFile = async (req, res) => {
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  console.log(req.files);

  const { sampleFile } = req.files;

  // Check for file name to see if it's a repeat
  let docs;
  try {
    const query = { user: req.session.account._id };
    docs = await File.find(query).select('name').lean().exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving files!' });
  }

  for (let i = 0; i < docs.length; i++) {
    console.log(docs);
    console.log(sampleFile.name);
    console.log(docs[i].name);
    if (docs[i].name === sampleFile.name) {
      return res.status(403).json({
        error: 'File name already exists',
      });
    }
  }

  // Add to sampleFile
  sampleFile.user = req.session.account._id;

  // try {
  const newFile = new File(sampleFile);

  // CHECK FOR MIME TYPE
  const acceptedMimeTypes = ['application/vnd.ms-excel', 'application/msexcel', 'application/x-msexcel', 'application/x-ms-excel', 'application/x-excel', 'application/x-dos_ms_excel', 'application/xls', 'application/x-xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  let mimeTypeFound = false;

  for (let i = 0; i < acceptedMimeTypes.length; i++) {
    if (newFile.mimetype === acceptedMimeTypes[i]) {
      mimeTypeFound = true;
    }
  }
  if (!mimeTypeFound) {
    // correct error code?
    return res.status(403).json({
      error: 'Incorrect file type',
    });
  }

  // const doc = await newFile.save();

  // Add the file
  return res.render('upload', { files: docs });
};

const retrieveFile = async (req, res) => {
  if (!req.query._id) {
    return res.status(400).json({ error: 'Missing file id!' });
  }

  let doc;
  try {
    // First we attempt to find the file by the _id sent by the user.
    doc = await File.findOne({ _id: req.query._id }).exec();
  } catch (err) {
    // If we have an error contacting the database, let the user know something happened.
    console.log(err);
    return res.status(400).json({ error: 'Something went wrong retrieving file!' });
  }

  if (!doc) {
    return res.status(404).json({ error: 'File not found!' });
  }

  res.set({

    'Content-Type': doc.mimetype,

    'Content-Length': doc.size,

    'Content-Disposition': `filename="${doc.name}"`,
  });

  return res.send(doc.data);
};

// thought process in making the search function
const searchFile = async (req, res) => {
  // nothing was input
  if (!req.query._id) {
    return res.status(400).json({ error: 'Missing search term!' });
  }

  let doc;
  const query = { user: req.session.account._id };

  // retrieve the files. I need to find how to do this when grabbing all files
  try {
    doc = await File.find(query).select('name data').lean().exec();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Something went wrong retrieving files!' });
  }
  // if no files were found. Could handle better
  if (!doc) {
    return res.status(404).json({ error: 'No files found!' });
  }

  // get arrays for the sheets we find
  const sheets = [];
  for (let i = 0; i < doc.length; i++) {
    const workbook = XLSX.read(doc[i].data.buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;

    // convert to json for ease of use
    const jsonSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], 
      { blankrows: false });
    console.log(jsonSheet);
    try {
      // search for the term. possibly make everything lowercase?
      for (let num = 0; num < jsonSheet.length; num++) {
        // get keys
        for (const key in jsonSheet[i]) {
          // keys.push(key);
          console.log(`Sheet: ${doc[i].name}`);
          const searchString = req.query._id.toLowerCase();
          console.log(searchString);
          console.log(jsonSheet[num][key].toLowerCase());
          // if found add
          if (searchString === jsonSheet[num][key].toLowerCase()) {
            sheets.push(doc[i]);
          }
        }
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  console.log('what we send');
  console.log(sheets);
  // return for later use (displaying which sheets it was found in)
  return res.render('upload', { files: sheets });
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile,
  searchFile,
};
