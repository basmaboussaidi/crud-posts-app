import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Post} from '../models/Post'
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'new-post-dialog',
  templateUrl: 'post-dialog.component.html',
  styleUrls: ['post-dialog.component.scss']
})
export class PostDialogComponent {

  post: Post = {
    userId: null,
    body: null,
    id: null,
    author: null,
    tags: null
  }

  postForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    if (data.post)
      this.post = {...data.post}
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      'body': new FormControl(this.post.body, [
        Validators.required
      ])
    }
    )
  }

  get body() { return this.postForm.get('body') }

  get author(){ return this.postForm.get('author')}


  cancel() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.dialogRef.close(({...this.post, ...this.postForm.value}))
  }


  
}