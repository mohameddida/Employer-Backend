interface MongoError extends Error {
    code?: number;
}

export const isMongoError = (error: unknown): error is MongoError => {
    return typeof (error as MongoError).code === 'number';
};
