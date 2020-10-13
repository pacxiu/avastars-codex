import mongoose from 'mongoose';

const testSchema = {
  id: String,
  Gender: String,
  Score: String,
  traits: Object,
};

export const AvastarCollectionModel =
  // @ts-ignore
  mongoose.models.AvastarCollection ||
  mongoose.model('AvastarCollection', testSchema, 'avastarcollection');

// const itemsSchema = {
//   tokenId: String,
//   totalPrice: String,
//   buyer: String,
//   seller: String,
//   transactionHash: String,
//   blockNumber: Number,
//   timestamp: Number,
// };

// export const AvastarCollectionModel =
//   // @ts-ignore
//   mongoose.models.AuctionSuccessful || mongoose.model('AuctionSuccessful', itemsSchema);
