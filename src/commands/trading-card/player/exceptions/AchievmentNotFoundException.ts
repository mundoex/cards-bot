export class AchievmentNotFoundException extends Error{
    constructor(){
        super("Achievment not found");
    }
}