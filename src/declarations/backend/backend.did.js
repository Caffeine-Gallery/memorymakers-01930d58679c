export const idlFactory = ({ IDL }) => {
  const Student = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'quote' : IDL.Text,
    'photoUrl' : IDL.Text,
    'grade' : IDL.Nat,
  });
  return IDL.Service({
    'addStudent' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getAllStudents' : IDL.Func([], [IDL.Vec(Student)], ['query']),
    'getStudent' : IDL.Func([IDL.Nat], [IDL.Opt(Student)], ['query']),
    'updateStudent' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Nat, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
