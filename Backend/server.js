const express = require('express');
const app = express();
const { cloudinary } = require('./utils/cloudinary');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:luc_test')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'luc'
    });

    console.log('uploadedResponse', uploadedResponse);
    res.json({ message: 'Uploaded successfully' });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
