export abstract class Curd{
    abstract Post(...args:any):unknown
    abstract Get(...args:any):unknown
    abstract Update(...args:any):unknown
    abstract Delete(...args:any):unknown
}
export type controller = InstanceType<typeof Curd>