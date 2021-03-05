const controller = require('./user-controller.js');
const { get } = require('../services/user-service.js');

jest.mock('../services/user-service.js', () => {
  return {
    get: jest.fn()
  }
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should respond with user object', async () => {
    const user = {name: "asd"};
    const id = 1;
    const mockSend = jest.fn();
    const mockRequest = {params: {id: id}};
    const mockResponse = {send: mockSend};
    const mockNext = jest.fn();

    get.mockReturnValueOnce(user)

    await controller.get(mockRequest, mockResponse, mockNext);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(id);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(user);
    expect(mockNext).toHaveBeenCalledTimes(1);
});

test('should return 404 as of missing user', async () => {
  const id = 1;
  const mockSend = jest.fn();
  const mockStatus = jest.fn();
  const mockRequest = {params: {id: id}};
  const mockResponse = {send: mockSend, status: mockStatus};
  const mockNext = jest.fn();

  mockStatus.mockReturnValueOnce(mockResponse);

  await controller.get(mockRequest, mockResponse, mockNext);

  expect(get).toHaveBeenCalledTimes(1);
  expect(get).toHaveBeenCalledWith(id);
  expect(mockStatus).toHaveBeenCalledTimes(1);
  expect(mockStatus).toHaveBeenCalledWith(404);
  expect(mockSend).toHaveBeenCalledTimes(1);
  expect(mockSend).toHaveBeenCalledWith("No user found with id 1");
});
