/* This model file defines the mongoose schema and model for a
   database collection that can store files. The format is based
   on the file object that is sent to our server by the browser
   when the user uploads a file.
*/
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  /* The name attribute that we recieve and will store defines
     the actual filename of the file uploaded. This will be equal
     to whatever the name of the file is on the users computer.
     The name will include the file extension.
  */
  name: {
    type: String,
  },

  /* The data attribute is the actual data within the file. It
     will be recieved by the server as a buffer of binary
     information. A buffer is similar to an array. A collection
     of information. If an image is uploaded, the buffer would
     store metadata about the image as well as the pixel information.
     If a text file is uploaded, it will contain metadata and
     the character information.
  */
  data: {
    type: Buffer,
  },

  // The size attribute defines the size of the given file in bytes.
  size: {
    type: Number,
  },

  /* The mimetype defines the actual type of file that is being
     sent and stored. MIME types tell things like the browser how
     to interpret the binary information stored in the data
     attribute. For example, the data format of a png will be
     very different from the data format of an mp3.
  */
  mimetype: {
    type: String,
  },
});

// Finally we construct a model based on our schema above.
const FileModel = mongoose.model('FileModel', FileSchema);

module.exports = FileModel;
