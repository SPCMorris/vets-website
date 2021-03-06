import _ from 'lodash/fp';
import { makeField } from '../../common/model/fields';
import { dateToMoment } from './helpers';

export function makeAddressField() {
  return {
    street: makeField(''),
    city: makeField(''),
    country: makeField('USA'),
    state: makeField(''),
    postalCode: makeField(''),
  };
}

export function createTour() {
  return {
    dateRange: {
      to: {
        month: makeField(''),
        day: makeField(''),
        year: makeField(''),
      },
      from: {
        month: makeField(''),
        day: makeField(''),
        year: makeField(''),
      }
    },
    serviceBranch: makeField(''),
    serviceStatus: makeField(''),
    involuntarilyCalledToDuty: makeField(''),
    doNotApplyPeriodToSelected: false,
    benefitsToApplyTo: makeField('')
  };
}

export function createEmploymentPeriod() {
  return {
    name: makeField(''),
    months: makeField(''),
    licenseOrRating: makeField(''),
    postMilitaryJob: makeField('')
  };
}

export function createEducationPeriod() {
  return {
    name: makeField(''),
    city: makeField(''),
    state: makeField(''),
    dateRange: {
      to: {
        month: makeField(''),
        day: makeField(''),
        year: makeField(''),
      },
      from: {
        month: makeField(''),
        day: makeField(''),
        year: makeField(''),
      }
    },
    hours: makeField(''),
    hoursType: makeField(''),
    degreeReceived: makeField(''),
    major: makeField('')
  };
}

export function createRotcScholarship() {
  return {
    amount: makeField(''),
    year: makeField('')
  };
}

export function createPreviousClaim() {
  return {
    claimType: makeField(''),
    previouslyAppliedWithSomeoneElsesService: makeField(''),
    fileNumber: makeField(''),
    sponsorVeteran: {
      fullName: {
        first: makeField(''),
        middle: makeField(''),
        last: makeField(''),
        suffix: makeField('')
      },
      fileNumber: makeField(''),
      payeeNumber: makeField('')
    }
  };
}

export function createFlightCertificate() {
  return {
    name: makeField('')
  };
}

export function createVeteran() {
  return {
    benefitsRelinquished: makeField(''),
    chapter30: false,
    chapter1606: false,
    chapter32: false,
    chapter33: false,
    serviceAcademyGraduationYear: makeField(''),
    currentlyActiveDuty: {
      yes: makeField(''),
      onTerminalLeave: makeField(''),
      nonVaAssistance: makeField('')
    },
    toursOfDuty: [],
    postHighSchoolTrainings: [],
    faaFlightCertificatesInformation: makeField(''),
    highSchoolOrGedCompletionDate: {
      month: makeField(''),
      day: makeField(''),
      year: makeField(''),
    },
    seniorRotcCommissioned: makeField(''),
    seniorRotc: {
      commissionYear: makeField(''),
      rotcScholarshipAmounts: []
    },
    seniorRotcScholarshipProgram: makeField(''),
    civilianBenefitsAssistance: false,
    additionalContributions: false,
    activeDutyKicker: false,
    reserveKicker: false,
    activeDutyRepaying: makeField(''),
    activeDutyRepayingPeriod: {
      to: {
        month: makeField(''),
        day: makeField(''),
        year: makeField(''),
      },
      from: {
        month: makeField(''),
        day: makeField(''),
        year: makeField(''),
      }
    },
    serviceBefore1977: {
      married: makeField(''),
      haveDependents: makeField(''),
      parentDependent: makeField('')
    },
    veteranFullName: {
      first: makeField(''),
      middle: makeField(''),
      last: makeField(''),
      suffix: makeField(''),
    },
    veteranSocialSecurityNumber: makeField(''),
    veteranDateOfBirth: {
      month: makeField(''),
      day: makeField(''),
      year: makeField(''),
    },
    gender: makeField(''),
    hasNonMilitaryJobs: makeField(''),
    nonMilitaryJobs: [],
    veteranAddress: makeAddressField(),
    email: makeField(''),
    emailConfirmation: makeField(''),
    homePhone: makeField(''),
    mobilePhone: makeField(''),
    preferredContactMethod: makeField(''),
    educationType: makeField(''),
    school: {
      name: makeField(''),
      address: makeAddressField()
    },
    educationObjective: makeField(''),
    educationStartDate: {
      month: makeField(''),
      day: makeField(''),
      year: makeField(''),
    },
    secondaryContact: {
      fullName: makeField(''),
      sameAddress: false,
      address: makeAddressField(),
      phone: makeField('')
    },
    bankAccount: {
      accountType: makeField(''),
      accountNumber: makeField(''),
      routingNumber: makeField('')
    },
    previousVaClaims: [],
    previouslyFiledClaimWithVa: makeField(''),
    applyingUsingOwnBenefits: makeField(''),
    benefitsRelinquishedDate: {
      day: makeField(''),
      month: makeField(''),
      year: makeField('')
    }
  };
}

export function veteranToApplication(veteran) {
  let data = veteran;

  if (data.activeDutyRepaying.value !== 'Y') {
    data = _.unset('activeDutyRepayingPeriod', data);
  }

  if (data.seniorRotcCommissioned.value !== 'Y') {
    data = _.unset('seniorRotc', data);
  }

  return JSON.stringify(data, (key, value) => {
    switch (key) {
      case 'seniorRotcCommissioned':
      case 'activeDutyRepaying':
      case 'hasNonMilitaryJobs':
      case 'emailConfirmation':
        return undefined;

      case 'serviceAcademyGraduationYear':
      case 'commissionYear':
      case 'year':
      case 'months':
      case 'hours':
        if (value.value === '') {
          return undefined;
        }
        return Number(value.value);

      case 'yes':
      case 'onTerminalLeave':
      case 'nonVaAssistance':
      case 'seniorRotcScholarshipProgram':
      case 'married':
      case 'haveDependents':
      case 'parentDependent':
      case 'previouslyFiledClaimWithVa':
      case 'previouslyAppliedWithSomeoneElsesService':
        return value.value === 'Y';

      case 'postMilitaryJob':
        return value.value === 'after';

      case 'veteranSocialSecurityNumber':
        if (value.value) {
          return value.value.replace(/\D/g, '');
        }
        return undefined;

      case 'involuntarilyCalledToDuty':
        if (value.value) {
          if (value.value === 'Y') {
            return 'yes';
          } else if (value.value === 'N') {
            return 'no';
          }
          return 'n/a';
        }
        return undefined;

      case 'applyingUsingOwnBenefits':
        if (value.value === 'ownBenefits') {
          return true;
        } else if (value.value === '') {
          return undefined;
        }

        return false;

      case 'address':
        if (value.city.value === '' && value.street.value === '') {
          return undefined;
        }

        return value;

      case 'amount':
        if (value.value === '') {
          return undefined;
        }

        return Number(value.value.replace('$', ''));

      default:
        // fall through.
    }

    if (value.month !== undefined && value.year !== undefined && value.day !== undefined) {
      if (value.month.value !== '' && value.day.value !== '' && value.year.value !== '') {
        return dateToMoment(value).format('YYYY-MM-DD');
      }

      return undefined;
    }

    // Strips out suffix if the user does not enter it.
    if (value.suffix !== undefined && value.suffix.value === '') {
      return _.unset('suffix', value);
    }

    if (value.value === '' && value.dirty !== undefined) {
      return undefined;
    }

    // Strip all the dirty flags out of the veteran and flatted it into a single atomic value.
    // Do this last in the sequence as a sweep of all remaining objects that are not special cased.
    if (value.value !== undefined && value.dirty !== undefined) {
      return value.value;
    }

    return value;
  });
}
