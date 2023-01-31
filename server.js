const express = require('express');
const app = express();
const PORT = 4000;
// const cors = require('cors')
// const morgan = require('morgan')

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT}`));