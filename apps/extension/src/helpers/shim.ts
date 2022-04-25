import { Buffer } from 'buffer'
import EventEmitter from 'events'
import process from 'process'

const g = globalThis

g.process = process
// @ts-ignore
g.Buffer = Buffer
// @ts-ignore
g.EventEmitter = EventEmitter

export { Buffer, process, g as global }
