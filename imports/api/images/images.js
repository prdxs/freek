
var createThumb = function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('200','300','^').gravity('Center').crop('200', '300').repage('+').stream().pipe(writeStream);
};

var createMedium = function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('800', '800', '^').gravity('center').crop('800', '800').repage('+').stream().pipe(writeStream);
};

export const Images = new FS.Collection("images", {
    stores: [
        new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
        new FS.Store.GridFS("medium", { transformWrite: createMedium })
    ]
});

// Allow all client-side updates since https://github.com/CollectionFS/Meteor-CollectionFS#using-insert-properly
// XXX Won't work I think
Images.allow({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
    download(userId, im) { return true; }
});