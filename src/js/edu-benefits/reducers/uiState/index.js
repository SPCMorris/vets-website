import _ from 'lodash/fp';

import {
  UPDATE_COMPLETED_STATUS,
  UPDATE_INCOMPLETE_STATUS,
  UPDATE_REVIEW_STATUS,
  UPDATE_VERIFIED_STATUS,
  UPDATE_SUBMISSION_STATUS,
  UPDATE_SUBMISSION_ID,
  UPDATE_SUBMISSION_TIMESTAMP
} from '../../actions';

const ui = {
  submission: {
    status: false,
    errorMessage: false,
    id: false,
    timestamp: false
  },
  pages: {
    '/introduction': {
      complete: false,
      verified: false,
      fields: []
    },
    '/benefits-eligibility/benefits-selection': {
      complete: false,
      verified: false,
      fields: ['benefitsRelinquished', 'chapter30', 'chapter32', 'chapter33', 'chapter1606', 'previouslyFiledClaimWithVa', 'benefitsRelinquishedDate', 'applyingUsingOwnBenefits']
    },
    '/benefits-eligibility/previous-claims': {
      complete: false,
      verified: false,
      fields: ['previousVaClaims']
    },
    '/military-history/military-service': {
      complete: false,
      verified: false,
      fields: ['serviceAcademyGraduationYear', 'currentlyActiveDuty', 'toursOfDuty', 'seniorRotcCommissioned']
    },
    '/military-history/rotc-history': {
      complete: false,
      verified: false,
      fields: ['seniorRotc', 'seniorRotcScholarshipProgram']
    },
    '/military-history/benefits-history': {
      complete: false,
      verified: false,
      fields: ['civilianBenefitsAssistance', 'additionalContributions', 'activeDutyKicker', 'reserveKicker', 'activeDutyRepaying', 'activeDutyRepayingPeriod']
    },
    '/education-history/education-information': {
      complete: false,
      verified: false,
      fields: ['highSchoolOrGedCompletionDate', 'postHighSchoolTrainings']
    },
    '/employment-history/employment-information': {
      complete: false,
      verified: false,
      fields: ['hasNonMilitaryJobs', 'nonMilitaryJobs']
    },
    '/school-selection/school-information': {
      complete: false,
      verified: false,
      fields: ['educationType', 'school']
    },
    '/veteran-information': {
      complete: false,
      verified: false,
      fields: ['veteranFullName', 'veteranSocialSecurityNumber', 'veteranDateOfBirth', 'gender']
    },
    '/personal-information/contact-information': {
      complete: false,
      verified: false,
      fields: ['veteranAddress', 'email', 'emailConfirmation', 'homePhone', 'mobilePhone', 'preferredContactMethod']
    },
    '/personal-information/secondary-contact': {
      complete: false,
      verified: false,
      fields: ['secondaryContact']
    },
    '/personal-information/dependents': {
      complete: false,
      verified: false,
      fields: ['serviceBefore1977']
    },
    '/personal-information/direct-deposit': {
      complete: false,
      verified: false,
      fields: ['bankAccount']
    },
    '/review-and-submit': {
      complete: false,
      verified: false,
      fields: []
    }
  }
};

function uiState(state = ui, action) {
  switch (action.type) {
    case UPDATE_COMPLETED_STATUS:
      return _.set(['pages', action.path, 'complete'], true, state);

    case UPDATE_INCOMPLETE_STATUS:
      return _.set(['pages', action.path, 'complete'], false, state);

    case UPDATE_REVIEW_STATUS:
      return _.set(['pages', action.path, 'complete'], action.value, state);

    case UPDATE_VERIFIED_STATUS:
      return _.set(['pages', action.path, 'verified'], action.value, state);

    case UPDATE_SUBMISSION_STATUS:
      return _.set('submission.status', action.value, state);

    case UPDATE_SUBMISSION_ID:
      return _.set('submission.id', action.value, state);

    case UPDATE_SUBMISSION_TIMESTAMP:
      return _.set('submission.timestamp', action.value, state);

    default:
      return state;
  }
}

export default uiState;
