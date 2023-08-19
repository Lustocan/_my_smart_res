export class Queue{
    constructor(_id? : String ,queue?: Array<{_id_order: String}>, for_bar ?: Boolean ,for_kitchen ?: Boolean ){   
            this._id = _id ;
            this.queue        = queue         ;
            this.for_bar     = for_bar     ;
    }
    _id ?: String ;
    queue ?: Array<{_id_order: String}> ;
    for_bar ?: Boolean ;
}
