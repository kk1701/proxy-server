const app = require('./index.js');
const dotenv = require('dotenv');

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`Proxy server running on http://localhost:${process.env.PORT}`);
});
