# Database Management Systems (DBMS) Deep Dive

## 1. ACID Properties
Relational databases rely on ACID to guarantee transaction reliability:
- **Atomicity:** "All or nothing." If part of a transaction fails, the entire transaction fails, and the database state is left unchanged.
- **Consistency:** Ensures that a transaction can only bring the database from one valid state to another, maintaining all constraints.
- **Isolation:** Concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially.
- **Durability:** Once a transaction has been committed, it will remain so, even in the event of a power loss or crash.

## 2. Database Normalization
The process of organizing data to minimize redundancy.
- **1NF:** Eliminate repeating groups. Ensure atomic columns.
- **2NF:** 1NF + remove partial dependencies (all non-key attributes must depend on the primary key).
- **3NF:** 2NF + remove transitive dependencies (non-key attributes should not depend on other non-key attributes).
- **BCNF:** A stricter version of 3NF where every determinant is a candidate key.

## 3. Concurrency Control and Isolation Levels
How databases handle concurrent transactions reading and writing the same data:
- **Read Uncommitted:** Lowest level. Allows "Dirty Reads" (reading uncommitted data).
- **Read Committed:** Prevents Dirty Reads, but allows "Non-repeatable Reads" (data changes if read twice in the same transaction).
- **Repeatable Read:** Prevents Non-repeatable Reads, but allows "Phantom Reads" (new rows matching a query condition are added by another transaction).
- **Serializable:** Highest level. Complete isolation, as if transactions executed one after another.

## 4. Indexing Strategy
Indexes speed up data retrieval operations at the cost of additional storage and slower writes.
- **B-Tree / B+Tree Indexes:** The most common type. Keeps data sorted and allows searches, sequential access, insertions, and deletions in logarithmic time.
- **Hash Indexes:** Fast O(1) lookups but cannot be used for range queries.

## 5. Relational (SQL) vs Non-Relational (NoSQL)
- **SQL (MySQL, PostgreSQL):** Schema-based, ACID compliant, vertically scalable, uses JOINs. Best for structured data and complex queries.
- **NoSQL:** Schema-less, horizontally scalable, eventual consistency (CAP Theorem). 
  - *Key-Value:* Redis, DynamoDB.
  - *Document:* MongoDB, CouchDB.
  - *Column-Family:* Cassandra, HBase.
  - *Graph:* Neo4j.


### Advanced Database Management Concepts
1. **Transaction Isolation Levels**: 
   - Read Uncommitted (Dirty reads possible)
   - Read Committed (No dirty reads)
   - Repeatable Read (No non-repeatable reads, phantom reads possible)
   - Serializable (Highest strictness, uses locking/MVCC, zero concurrency anomalies).
2. **Indexing & B+ Trees**: Databases use B+ Trees for indexes because data pointers are only at leaf nodes, making range queries incredibly fast via linked leaves.
3. **ACID vs BASE**: Relational DBs prioritize Consistency (ACID properties), while NoSQL databases prioritize Availability and Eventual Consistency (BASE).
