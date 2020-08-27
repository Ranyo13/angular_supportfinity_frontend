import { FormGroup } from '@angular/forms';
export function unmatchingSkills(skillOneKey: string, skillTwoKey: string, skillThreeKey: string)
{
    return (group: FormGroup): {[key: string]: any} => {
        let skillOne = group.controls[skillOneKey];
        let skillTwo = group.controls[skillTwoKey];
        let skillThree = group.controls[skillThreeKey];

        if(skillOne.value == skillTwo.value || skillOne.value == skillThree.value || skillTwo.value == skillThree.value){

            return {
                matchingSkills: true
            }
        }
    }
}