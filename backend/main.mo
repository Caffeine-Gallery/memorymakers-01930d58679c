import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  // Define the Student type
  public type Student = {
    id: Nat;
    name: Text;
    grade: Nat;
    photoUrl: Text;
    quote: Text;
  };

  // Create a stable variable to store students
  private stable var studentsEntries : [(Nat, Student)] = [];
  private var students = HashMap.HashMap<Nat, Student>(0, Nat.equal, Nat.hash);
  private stable var nextId : Nat = 0;

  // Initialize the HashMap with stable data
  system func preupgrade() {
    studentsEntries := Iter.toArray(students.entries());
  };

  system func postupgrade() {
    students := HashMap.fromIter<Nat, Student>(studentsEntries.vals(), 0, Nat.equal, Nat.hash);
    studentsEntries := [];
  };

  // Add a new student
  public func addStudent(name: Text, grade: Nat, photoUrl: Text, quote: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let student : Student = {
      id;
      name;
      grade;
      photoUrl;
      quote;
    };
    students.put(id, student);
    id
  };

  // Get all students
  public query func getAllStudents() : async [Student] {
    Iter.toArray(students.vals())
  };

  // Get a student by ID
  public query func getStudent(id: Nat) : async ?Student {
    students.get(id)
  };

  // Update a student
  public func updateStudent(id: Nat, name: Text, grade: Nat, photoUrl: Text, quote: Text) : async Bool {
    switch (students.get(id)) {
      case (null) {
        false
      };
      case (?existingStudent) {
        let updatedStudent : Student = {
          id;
          name;
          grade;
          photoUrl;
          quote;
        };
        students.put(id, updatedStudent);
        true
      };
    }
  };
}
