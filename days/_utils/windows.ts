function* _windows<T>(iter: Iterable<T>, size: number): Iterable<T[]> {
  let packet: T[] = [];

  for (const item of iter) {
    packet.push(item);

    if (packet.length >= size) {
      yield packet;
      packet = packet.slice(1);
    }
  }
}

export const windows =
  (size: number) =>
  <T>(iter: Iterable<T>) =>
    _windows(iter, size);

windows._ = _windows
