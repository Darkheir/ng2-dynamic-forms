import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    MdAutocomplete,
    MdCheckbox,
    MdDatepicker,
    MdInputContainer,
    MdRadioGroup,
    MdSelect,
    MdSlider,
    MdSlideToggle
} from "@angular/material";
import {
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng2-dynamic-forms/core";
import { MdFormControlType, MD_VIEW_CHILD_SELECTOR } from "./dynamic-form-material.const";

export type MdFormControlComponent = MdAutocomplete | MdCheckbox | MdDatepicker<Date> | MdInputContainer |
    MdRadioGroup | MdSelect | MdSlider | MdSlideToggle;

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material.component.html"
})
export class DynamicFormMaterialComponent extends DynamicFormControlComponent implements OnChanges {

    private _showCharacterCount: boolean = false;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as DynamicInputModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;

    @ViewChild(MD_VIEW_CHILD_SELECTOR) mdViewChild: MdFormControlComponent | undefined;

    type: MdFormControlType | null;

    constructor(protected validationService: DynamicFormValidationService) {
        super(validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = DynamicFormMaterialComponent.getFormControlType(this.model);
        }
    }

    get characterCount(): number | null {

        if (this.mdViewChild instanceof MdInputContainer) {
            return (this.mdViewChild as MdInputContainer)._mdInputChild.value.length;

        } else {
            return null;
        }
    }

    static getFormControlType(model: DynamicFormControlModel): MdFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return MdFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return MdFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return MdFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                return MdFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return MdFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return MdFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return MdFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return MdFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return MdFormControlType.SlideToggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return MdFormControlType.TextArea;

            default:
                return null;
        }
    }
}