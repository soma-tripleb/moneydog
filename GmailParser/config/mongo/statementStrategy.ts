import { MongoClient } from 'mongodb';

interface StatementStrategy {
  getConn(): MongoClient;
}

class FindStatement implements StatementStrategy {
  getConn() {
    return MongoClient;
  }
}

export default FindStatement;
