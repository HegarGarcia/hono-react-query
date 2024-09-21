export type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Fix `{}` usage inside types.
 *
 * `{}` represents any type that is not `null | undefined`.
 * This unexpected behavior can cause a lot of silent bugs, the correct type to represent an empty object is `Record<string, never>`.
 *
 * This type utility checkes if the type is `{}` and if so, it returns `Record<string, never>`.
 */
export type FilterEmptyObject<T> = T extends object
  ? keyof T extends never
    ? Record<string, never>
    : T
  : never;
