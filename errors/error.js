const http2 = require('node:http2');

const RES_OK = http2.constants.HTTP_STATUS_OK;
const CREATED = http2.constants.HTTP_STATUS_CREATED;
const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND;
const INTERNAL_SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

module.exports = {
  RES_OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};
