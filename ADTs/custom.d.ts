import {oneOf} from 'jsverify'

declare module 'jsverify' {
    export const oneof: typeof oneOf
}