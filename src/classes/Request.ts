import { HTTPMethods } from "../types/enums";
import querystring from "querystring";

export class JabFRequest {
  method: HTTPMethods;
  path: string;
  query: Record<string, any>;
  //   data: Record<string, any>;
  //   reqbody: string;

  constructor(requestStringorBuffer: HTTPMethods | Buffer) {
    const requestString =
      requestStringorBuffer instanceof Buffer
        ? requestStringorBuffer.toString()
        : requestStringorBuffer;

    const lines: string[] = requestString.toString().split("\n");
    const lastLine: string = lines[lines.length - 1];
    const firstLineSplits: string[] = lines[0].split(" ");
    const pathString: string = firstLineSplits[1];
    const queryIndex: number = pathString.indexOf("?");

    if (queryIndex != -1) {
      const queryInString: string = pathString.substring(queryIndex + 1);
      this.query = querystring.parse(queryInString);
      this.path = pathString.substring(0, queryIndex);
    } else {
      this.query = {};
      this.path = pathString;
    }

    // parsing data remains
    // will do after implementing basic GET functionality

    this.method = firstLineSplits[0] as HTTPMethods;
  }
}

// export type JabFRequest = typeof JabFRequest;
