// Data Transfert Object


class Todo{
    constructor({id,userId,title,completed=false}){
        this.id=id
        this.userId=userId
        this.title=title
        this.completed=completed
        Object.freeze(this)
    }

  static fromJson(payload) {
    if (!payload || typeof payload !== "object") {
      throw new Error("Payload invalide pour TodoDTO");
    }
    const { id, userId, title, completed } = payload;
    return new Todo({
      id: Number(id),
      userId: Number(userId),
      title: String(title ?? ""),
      completed: Boolean(completed),
    });
  }    
}



export {
   Todo
}
