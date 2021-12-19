import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export const O365_BASE_URL = 'https://outlook.office.com/calendar/deeplink';
export const DEFAULT_QUERY_PARAMS = {
  subject: 'Title',
  body: '<p>Body<br> <br> URL example: <a href="https://www.google.com">Google</a></p>',
  location: 'Location',
  startdt: new Date().toISOString().substring(0, 16),
  enddt: new Date(Date.now() + 60 * 60 * 1000).toISOString().substring(0, 16)
};

@Component({
  selector: 'app-cal-invite-editor',
  templateUrl: './cal-invite-editor.component.html',
  styleUrls: ['./cal-invite-editor.component.scss']
})
export class CalInviteEditorComponent implements OnInit {
  generatedURL = '';
  shareURL = '';
  eventDetailsForm = new FormGroup({
    subject: new FormControl(''),
    body: new FormControl(''),
    location: new FormControl(''),
    startdt: new FormControl(''),
    enddt: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cleanURLs();
    this.route.queryParams
      .subscribe(params => {
        this.eventDetailsForm.patchValue({
          subject: params.subject ? params.subject : DEFAULT_QUERY_PARAMS.subject,
          body: params.body ? params.body : DEFAULT_QUERY_PARAMS.body,
          location: params.location ? params.location : DEFAULT_QUERY_PARAMS.location,
          startdt: params.startdt ? params.startdt : DEFAULT_QUERY_PARAMS.startdt,
          enddt: params.enddt ? params.enddt : DEFAULT_QUERY_PARAMS.enddt,
        });
      }
    );
  }

  onSubmit() {
    this.prepareURLs();
  }

  onResetForm() {
    this.cleanURLs();
    this.router.navigate([]);
  }

  private prepareURLs() {
    const queryParams = '?subject=' + encodeURIComponent(this.eventDetailsForm.value.subject)
    + '&body=' + encodeURIComponent(this.eventDetailsForm.value.body)
    + '&location=' + encodeURIComponent(this.eventDetailsForm.value.location)
    + '&startdt=' + encodeURIComponent(this.eventDetailsForm.value.startdt)
    + '&enddt=' + encodeURIComponent(this.eventDetailsForm.value.enddt);

    this.generatedURL = O365_BASE_URL + '/compose' + queryParams;
    this.shareURL = '/' + queryParams;
  }

  private cleanURLs() {
    this.generatedURL = '';
    this.shareURL = '';
  }
}
