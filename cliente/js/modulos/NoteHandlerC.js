export class NoteHandlerC {
    constructor(url) {
        this._url = url;
        this._lastQueryStatus = null;
    }

    getAllNotes(onSuccesCallBack, onErrorCallBack) {
        fetch(`${this._url}/notes`)
            .then((datos) => {
                datos.json().then((datos) => {
                    this._lastQueryStatus = true;
                    onSuccesCallBack(datos);
                }, (error) => {
                    this._lastQueryStatus = false;
                    onErrorCallBack('JSONException');
                })
            }, (error) => {
                this._lastQueryStatus = false;
                onErrorCallBack('ConnectionException');
            });
    }

    addNote(note, onSuccesCallBack, onErrorCallBack) {
        fetch(`${this._url}/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this._lastQueryStatus = true;
                    onSuccesCallBack(data);
                });
            } else {
                this._lastQueryStatus = false;
                onErrorCallBack('ServerError');
            }
        })
        .catch((error) => {
            this._lastQueryStatus = false;
            onErrorCallBack('ConnectionException');
        });
    }
}