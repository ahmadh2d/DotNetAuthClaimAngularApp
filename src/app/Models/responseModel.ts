import { ResponseCode } from "../enums/responseCode";

export class ResponseModel {
    public responseStatusCode: ResponseCode = ResponseCode.NOT_SET;
    public responseMessage: string = "";
    public dataSet : any;
}