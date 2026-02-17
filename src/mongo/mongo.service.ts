import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit {
  private client: MongoClient;
  public db: Db; 

  async onModuleInit() {
    
    const uri = process.env.MONGODB_URI!;
    this.client = new MongoClient(uri);

    await this.client.connect();
    this.db = this.client.db('products');
    
    console.log('MongoDB connected successfully');
  }

  // Add a method to get collection safely
  getCollection(collectionName: string): Collection {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db.collection(collectionName);
  }

  async insertMany(collectionName: string, data: any[]) {
    const collection = this.getCollection(collectionName);
    return collection.insertMany(data);
  }
}