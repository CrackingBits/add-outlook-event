import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export const O365_BASE_URL = 'https://outlook.office.com/calendar/deeplink';

@Component({
  selector: 'app-cal-invite-editor',
  templateUrl: './cal-invite-editor.component.html',
  styleUrls: ['./cal-invite-editor.component.scss']
})
export class CalInviteEditorComponent implements OnInit {
  generatedURL = '';
  eventDetailsForm = new FormGroup({
    subject: new FormControl(''),
    body: new FormControl(''),
    location: new FormControl(''),
    startdt: new FormControl(''),
    enddt: new FormControl(''),
  });

  ngOnInit(): void {
    this.eventDetailsForm.patchValue({
      subject: 'Title',
      body: '<p>body<br> <br> URL example: <a href="https://www.google.com">Google</a></p>',
      location: 'Location',
      startdt: new Date().toISOString().substring(0, 16),
      enddt: new Date(Date.now() + 60 * 60 * 1000).toISOString().substring(0, 16),
    });
  }

  onSubmit() {
    this.generatedURL = O365_BASE_URL
        + '/compose'
        + '?subject=' + encodeURIComponent(this.eventDetailsForm.value.subject)
        + '&body=' + encodeURIComponent(this.eventDetailsForm.value.body)
        + '&location=' + encodeURIComponent(this.eventDetailsForm.value.location)
        + '&startdt=' + encodeURIComponent(this.eventDetailsForm.value.startdt)
        + '&enddt=' + encodeURIComponent(this.eventDetailsForm.value.enddt);
  }
}
