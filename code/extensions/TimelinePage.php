<?php

/**
 * Extension to all page objects that add timeline relationships
 * 
 * @author Thomas Meehan
 * @package timeline
 */
class TimelinePage extends DataExtension {
    
    /**
     * DB Columns
     * 
     * @var array
     * @config
     */
    static $db = array(
        'ShowTimeline'  => 'Boolean',
    );

    /**
     * Has Many relations
     * 
     * @var array
     * @config
     */
    static $has_many = array(
        'Events' => 'TimelineEvent'
    );

    /**
     * Default variables
     * 
     * @var array
     * @config
     */
    static $defaults = array();

    function __construct() {

        parent::__construct();
    }

    public function updateCMSFields(FieldList $fields) {

        if($this->owner->ShowTimeline) {
            // Create add button
            $add_button = new GridFieldAddNewButton('toolbar-header-left');
            $add_button->setButtonName('Add Event');

            // Add timeline editor
            $grid_config = GridFieldConfig_RecordEditor::create()
                ->removeComponentsByType('GridFieldAddNewButton')
                ->removeComponentsByType('GridFieldFilterHeader')
                ->addComponent(new GridFieldOrderableRows('Sort'))
                ->addComponent($add_button);

            $timeline_table = GridField::create(
                'Events',
                false,
                $this->owner->Events(),
                $grid_config
            );

            $fields->addFieldToTab('Root.Timeline', $timeline_table);
        } else {
            $fields->removeByName('Events');
        }

        $fields->removeByName('ShowTimeline');

        parent::updateCMSFields($fields);
    }

    public function updateSettingsFields(FieldList $fields) {
        $message = '<p>Configure this page to use a timeline</p>';
        $fields->addFieldToTab('Root.Settings', LiteralField::create("TimelineMessage", $message));

        $timeline = FieldGroup::create(
            CheckboxField::create('ShowTimeline', 'Show a timeline on this page?')
        )->setTitle('Timeline');

        $fields->addFieldToTab('Root.Settings', $timeline);

        if($this->owner->ShowTimeline) {

        }
    }

    public function Timeline() {

        return $this
            ->owner
            ->renderWith(
                'Timeline',
                array(
                    'Events' => $this->owner->Events()
                )
            );
    }
}
