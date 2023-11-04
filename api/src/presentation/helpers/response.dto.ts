export class ResponseDTO {
    constructor(
        readonly status: number,
        readonly message: string,
        readonly data: any 
    ) {}
}