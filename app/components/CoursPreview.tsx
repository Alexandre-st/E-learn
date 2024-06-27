"use client"
import React from 'react';
import {CoursPreviewProps} from "../../types/types";

const CoursProfesseur: React.FC<CoursPreviewProps> = ({ cours, isPublished, user }) => {
    return (
        <>
            <div>
                <h1 className="title_course">{cours.titre}</h1>
                <h2>Description</h2>
                <p>{cours.description}</p>
            </div>
        </>
    );
};

export default CoursProfesseur;
