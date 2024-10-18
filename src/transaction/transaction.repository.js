const prisma = require("../db");

async function createTransaction(userId, itemId, quantityBorrowed) {
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                userId,
                itemId,
                quantityBorrowed,
                status: "PENDING",
            }
        });
        return newTransaction;
    } catch (error) {
        throw new Error("Failed to create transaction")
    }
}

async function findTransactions() {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                Item: {
                    select: {
                        name: true
                    }
                }
            }

        });
        console.log(transactions);

        return transactions;
    } catch (error) {
        console.log(error);

        throw new Error('Failed to fetch transactions');
    }
}

async function findTransactionsByUserId(userId) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                },
                Item: {
                    select: {
                        name: true
                    }
                }
            }

        });
        console.log(userId);

        return transactions;
    } catch (error) {
        console.log(error);

        throw new Error('Failed to fetch transaction by User ID');
    }
}


async function findTransactionById(id) {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id)
            },

        });
        return transaction;

    } catch (error) {
        console.log(error);

    }

}

async function updateTransactionStatus(transactionId, status, timeStampField) {
    try {
        updateData = {
            status,
        }

        if (timeStampField) {
            updateData[timeStampField] = new Date();
        }

        await prisma.transaction.update({
            where: {
                id: parseInt(transactionId),
            },
            data: updateData,
        });
    } catch (error) {
        throw new Error('Failed to update transaction status');
    }
}

module.exports = {
    createTransaction,
    findTransactions,
    findTransactionsByUserId,
    findTransactionById,
    updateTransactionStatus
}