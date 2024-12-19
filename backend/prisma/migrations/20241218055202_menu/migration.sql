-- CreateTable
CREATE TABLE "Menu" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" TEXT,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Menu"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
