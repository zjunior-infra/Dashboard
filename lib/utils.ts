export const fetcher = (...args: Parameters<typeof fetch>) => 
    fetch(...args).then((res) => res.json());


export function getResultOrError<T, E>(result: T, error?: E): Result<T, E> {
    if (error) {
        return { error };
    }
    return { result: result };
}

export function methodNotAllowedError(){
    return getResultOrError('','Not Allowed');
}