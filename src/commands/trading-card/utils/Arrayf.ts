export class Arrayf{
    static slitArrayInChunks(inputArray:any[],itemsPerChunk:number) : any[]{
        return inputArray.reduce((resultArray, item, index) => { 
            const chunkIndex = Math.floor(index/itemsPerChunk);
            if(!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [];
            }
            resultArray[chunkIndex].push(item);
            return resultArray;
        }, []);
    }
}