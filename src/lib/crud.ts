export abstract class Curd<T>{
    abstract Post(...args:any): Promise<T>;
    abstract Get(...args:any): Promise<T>;
    abstract Update(...args:any): Promise<T>;
    abstract Delete(...args:any): Promise<T>;
}
export type controller = InstanceType<typeof Curd>