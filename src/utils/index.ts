import { Entry, EntryDetail } from '../models';

declare global {
  interface Window {
    CompressionStream: any;
    DecompressionStream: any;
  }

  interface Navigator {
    virtualKeyboard: any;
  }
}

export function uuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function compress(data: Entry[]): Promise<string> {
  const stringifiedData = JSON.stringify(data);
  const byteArray = new TextEncoder().encode(stringifiedData);
  const cs = new window.CompressionStream('gzip');

  const writer = cs.writable.getWriter();
  writer.write(byteArray);
  writer.close();

  const arrayBuffer = await new Response(cs.readable).arrayBuffer();
  return new Uint8Array(arrayBuffer).toString();
}

export async function decompress(data: string): Promise<Entry[]> {
  const compressedData = new Uint8Array(JSON.parse('['.concat(data.concat(']'))));
  const ds = new window.DecompressionStream('gzip');

  const writer = ds.writable.getWriter();
  writer.write(compressedData);
  writer.close();

  const arrayBuffer = await new Response(ds.readable).arrayBuffer();
  const decompressedData = new TextDecoder().decode(arrayBuffer);
  return JSON.parse(decompressedData) as Entry[];
}

export function initializeTestData(): Entry[] {
  return [
    {
      id: uuidV4(),
      title: 'Day: 01.11.2021',
      totalPoints: 6,
      totalAwardedPoints: 5,
      details: [
        {
          id: uuidV4(),
          task: 'Task #1',
          points: 3,
          awardedPoints: 2,
          done: false,
        } as EntryDetail,
        {
          id: uuidV4(),
          task: 'Task #2',
          points: 2,
          awardedPoints: 2,
          done: true,
        } as EntryDetail,
        {
          id: uuidV4(),
          task: 'Task #3',
          points: 1,
          awardedPoints: 1,
          done: false,
        } as EntryDetail,
      ],
    } as Entry,
    {
      id: uuidV4(),
      title: 'Day: 02.11.2021',
      totalPoints: 3,
      totalAwardedPoints: 2,
      details: [
        {
          id: uuidV4(),
          task: 'Task #4',
          points: 2,
          awardedPoints: 1,
          done: true,
        } as EntryDetail,
        {
          id: uuidV4(),
          task: 'Task #5',
          points: 1,
          awardedPoints: 1,
          done: false,
        } as EntryDetail,
      ],
    } as Entry,
  ];
}

export function formatDate(form: HTMLFormElement): string {
  const fd = new FormData(form);
  const selectedDate = fd.get('date')?.toString() ?? Date.now();
  const formattedDate = new Intl.DateTimeFormat(navigator.language, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(selectedDate));
  return formattedDate;
}

export function getCheckedTasks(form: HTMLFormElement): string[] {
  const result: string[] = [];

  const tasks = form.elements.namedItem('tasks[]') as RadioNodeList;
  tasks.forEach((taskNode: Node) => {
    const taskInput = taskNode as HTMLInputElement;
    if (taskInput.checked) {
      result.push(taskInput.value);
    }
  });

  return result;
}
