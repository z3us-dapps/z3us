import { Buffer } from 'buffer'
import process from 'process'

globalThis.process = process
globalThis.Buffer = Buffer

export {}
