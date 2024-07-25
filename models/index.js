const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB 서버 URI
const dbName = 'gps2'; // 연결할 데이터베이스 이름, gps는 gu, gps2는 경계(circle, square)

const client = new MongoClient(uri);

class Mongo {
  async insertData(collection, data) {
    try {
      const usersCollection = client.db(dbName).collection(collection);
      const result = await usersCollection.insertOne(data);
      console.log('Inserted data:', result.insertedCount);
    } catch (error) {
      console.error('Failed to insert data', error);
    }
  }

  async findData(collection) {
    try {
      const usersCollection = client.db(dbName).collection(collection);
      const result = await usersCollection.find().toArray();
      console.log('Found data:', result);
      return result;
    } catch (error) {
      console.error('Failed to find data', error);
    }
  }

  async findOne(collection, data) {
    try {
      const usersCollection = client.db(dbName).collection(collection);
      const result = await usersCollection.findOne({no: data.no, pw: data.pw});

      // return console.log(result)
      console.log('Found data:', result);
      return result;
    } catch (error) {
      console.error('Failed to find data', error);
    }
  }
}

const db = new Mongo();

module.exports = db;