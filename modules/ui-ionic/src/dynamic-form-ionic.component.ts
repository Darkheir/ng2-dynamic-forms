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
import { Checkbox, DateTime, TextInput, RadioGroup, Range, Select, Toggle } from "ionic-angular";
import {
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
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
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER
} from "@ng2-dynamic-forms/core";

export const enum IonicFormControlType {

    Array = 1, //"ARRAY",
    Checkbox = 2, //"CHECKBOX",
    DateTime = 3, //"DATETIME",
    Group = 4, //"GROUP",
    Input = 5, //"INPUT",
    RadioGroup = 6, //"RADIO_GROUP",
    Range = 7, //"RANGE",
    Select = 8, //"SELECT",
    TextArea = 9, //"TEXTAREA",
    Toggle = 10, //"TOGGLE"
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-ionic-control",
    templateUrl: "./dynamic-form-ionic.component.html"
})
export class DynamicFormIonicComponent extends DynamicFormControlComponent implements OnChanges {

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;

    @ViewChild(Checkbox) ionCheckbox: Checkbox | undefined;
    @ViewChild(DateTime) ionDateTime: DateTime | undefined;
    @ViewChild(TextInput) ionInput: TextInput | undefined;
    @ViewChild(RadioGroup) ionRadioGroup: RadioGroup | undefined;
    @ViewChild(Range) ionRange: Range | undefined;
    @ViewChild(Select) ionSelect: Select | undefined;
    @ViewChild(Toggle) ionToggle: Toggle | undefined;

    type: IonicFormControlType | undefined;

    constructor(protected validationService: DynamicFormValidationService) {
        super(validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = DynamicFormIonicComponent.getFormControlType(this.model);
        }
    }

    static getFormControlType(model: DynamicFormControlModel): IonicFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return IonicFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return IonicFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                return IonicFormControlType.DateTime;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return IonicFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return IonicFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return IonicFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return IonicFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return IonicFormControlType.Range;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return IonicFormControlType.Toggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return IonicFormControlType.TextArea;

            default:
                return null;
        }
    }
}