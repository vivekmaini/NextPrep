# Advanced System Design Architecture

## 1. The CAP Theorem
In a distributed data store, you can only guarantee two out of the following three:
- **Consistency:** Every read receives the most recent write or an error.
- **Availability:** Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
- **Partition Tolerance:** The system continues to operate despite an arbitrary number of messages being dropped by the network.
*Note: In the presence of a network partition (P), you must choose between Consistency (CP) and Availability (AP).*

## 2. Database Scaling and Partitioning
- **Sharding (Horizontal Partitioning):** Separating one large database into smaller, faster, more easily managed parts called data shards. Data is distributed across multiple machines based on a Shard Key.
- **Read Replicas:** A Master-Slave architecture where all writes go to the Master, and reads are distributed across multiple Slave replicas.
- **Consistent Hashing:** Used in distributed caching (like Redis cluster) to distribute data evenly across servers and minimize reorganization when nodes are added or removed.

## 3. Communication Protocols
- **WebSockets:** Full-duplex, bidirectional communication over a single TCP connection. Ideal for chat apps and real-time dashboards.
- **Long Polling:** The client requests information, and the server holds the request open until new data is available.
- **Server-Sent Events (SSE):** Unidirectional server-to-client communication. Good for real-time notifications where the client doesn't need to send much data back.

## 4. High Availability & Redundancy
- **Active-Passive (Failover):** Only the active server handles traffic. If it fails, the passive server takes over.
- **Active-Active:** Both servers handle traffic simultaneously. Requires complex synchronization.
- **Rate Limiting:** Controlling the rate of traffic sent or received by a network interface to prevent DDoS attacks and API abuse. (Algorithms: Token Bucket, Leaky Bucket, Sliding Window).

## 5. Real-World Design Patterns
- **Saga Pattern:** Managing distributed transactions across microservices.
- **Circuit Breaker:** Preventing an application from repeatedly trying to execute an operation that's likely to fail, giving the failing service time to recover.
- **Event Sourcing:** Storing the state of a system as a sequence of state-changing events.
