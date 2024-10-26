import fs from "fs/promises";

class Goa {
    constructor(start, end, isTrue, name) {
        this.start = start
        this.end = end
        this.isTrue = isTrue
        this.name = name
    }
    async delFiles() {
        for (let i = this.start; i < this.end; i++) {
            let fileIndex = String(i).padStart(2, "0")
            try {
                await fs.unlink(`./${this.name}${fileIndex}/classwork/classwork.txt`);
                await fs.unlink(`./${this.name}${fileIndex}/homework/homework.txt`);
                console.log(`Files in ${this.name}${fileIndex} deleted successfully.`);
            } catch (err) {
                console.error(`Error deleting files in ${this.name}${fileIndex}:`, err);
            }
            console.log("check!")
        }
    }
    async makeDirs() {
        const handleFileCreate = async (dirPath, flName, content) => {

            try {
                await fs.writeFile(`${dirPath}/${flName}`, content);
                console.log("File created successfully.");
            } catch (err) {
                console.error("Error creating file:", err);
            }
        }
        const handleDirMake = async (dirPath) => {
            try {

                if (this.isTrue) {
                    await fs.mkdir(dirPath, { recursive: true })
                } else {
                    await fs.rmdir(dirPath, { recursive: true })
                }
                console.log(`Directory ${dirPath} ${this.isTrue ? "create" : "remove"} successfully!`)
            } catch (err) {
                console.log(`Error handing directory ${dirPath}`)
            }

        }
        for (let i = this.start; i < this.end + 1; i++) {
            let fileNum = String(i).padStart(3, "0")
            let dayDir = `${this.name}${fileNum}`
            let classworkDir = `${dayDir}/classwork`
            let homeworkDir = `${dayDir}/homework`

            await handleDirMake(dayDir)
            await handleDirMake(classworkDir)
            await handleDirMake(homeworkDir)

            await handleFileCreate(homeworkDir, "homework.txt", "# No homework")
            await handleFileCreate(classworkDir, "classwork.txt", "# No classwork")
        }
    }

}
// args
// 0----> start, 1-----> end, 2-----> del/remove, 3-----> dir name
const newGoa = new Goa(0, 153, true, "level")

newGoa.makeDirs()