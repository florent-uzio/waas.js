export type RequiredExceptFor<T, K extends keyof T> = Partial<T> & Required<Omit<T, K>>
