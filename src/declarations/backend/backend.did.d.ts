import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Student {
  'id' : bigint,
  'name' : string,
  'quote' : string,
  'photoUrl' : string,
  'grade' : bigint,
}
export interface _SERVICE {
  'addStudent' : ActorMethod<[string, bigint, string, string], bigint>,
  'getAllStudents' : ActorMethod<[], Array<Student>>,
  'getStudent' : ActorMethod<[bigint], [] | [Student]>,
  'updateStudent' : ActorMethod<
    [bigint, string, bigint, string, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
