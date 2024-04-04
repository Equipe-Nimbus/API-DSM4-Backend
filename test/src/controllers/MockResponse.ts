import { Request, Response } from "express"
class MockResponse{

    resSemLocals = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({
            send: jest.fn().mockImplementation()
        })
    } as unknown as Response;

}

export default new MockResponse();
