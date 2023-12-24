-- AlterTable
ALTER TABLE "BruteBody" ADD COLUMN     "p1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p1a" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p1b" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p5" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p6" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p7" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "p7b" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "p8" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "BruteColors" ADD COLUMN     "col0" VARCHAR(7) NOT NULL DEFAULT '#eaaca6',
ADD COLUMN     "col0a" VARCHAR(7) NOT NULL DEFAULT '#eaaca6',
ADD COLUMN     "col0c" VARCHAR(7) NOT NULL DEFAULT '#eaaca6',
ADD COLUMN     "col1" VARCHAR(7) NOT NULL DEFAULT '#ffaa1e',
ADD COLUMN     "col1a" VARCHAR(7) NOT NULL DEFAULT '#ffaa1e',
ADD COLUMN     "col1b" VARCHAR(7) NOT NULL DEFAULT '#ffaa1e',
ADD COLUMN     "col1c" VARCHAR(7) NOT NULL DEFAULT '#ffaa1e',
ADD COLUMN     "col1d" VARCHAR(7) NOT NULL DEFAULT '#ffaa1e',
ADD COLUMN     "col2" VARCHAR(7) NOT NULL DEFAULT '#8ba3d7',
ADD COLUMN     "col2a" VARCHAR(7) NOT NULL DEFAULT '#fff9ae',
ADD COLUMN     "col2b" VARCHAR(7) NOT NULL DEFAULT '#7a73c8',
ADD COLUMN     "col3" VARCHAR(7) NOT NULL DEFAULT '#bb1111',
ADD COLUMN     "col3b" VARCHAR(7) NOT NULL DEFAULT '#fae31f',
ADD COLUMN     "col4" VARCHAR(7) NOT NULL DEFAULT '#559399',
ADD COLUMN     "col4a" VARCHAR(7) NOT NULL DEFAULT '#7a73c8',
ADD COLUMN     "col4b" VARCHAR(7) NOT NULL DEFAULT '#0000ff';