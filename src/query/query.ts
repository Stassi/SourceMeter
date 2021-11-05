import type { RemoteInfo } from './createUDPSocket'
import type { Socket } from 'node:dgram'
import { Buffer } from 'node:buffer'
import { createUDPSocket } from './createUDPSocket'
import { handleUDPSocketError } from './handleUDPSocketError'

export type Query = RemoteInfo & {
  message: Buffer
}

export default function query({
  address,
  message,
  port,
}: {
  address?: string
  message: Buffer
  port?: number
}): Promise<Query> {
  return new Promise(
    (resolve: (x: any) => unknown, reject: (error: Error) => void) => {
      const socket: Socket = createUDPSocket({ resolve, reject })

      socket.send(
        message,
        port,
        address,
        handleUDPSocketError({
          reject,
          socket,
        })
      )
    }
  )
}
