const server = require('./server');

const init = async () => {
  try {
    const serverInstance = await server.start();
    console.log(`App running on port: ${serverInstance.server.address().port}`);
  } catch (error) {
    console.log(`App failed to start ${error.message}`);
  }
};

init();
