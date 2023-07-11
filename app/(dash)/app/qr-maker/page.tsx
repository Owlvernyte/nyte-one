'use client'

import QRCanvas from '@/components/QRCanvas'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { QRCanvasOptions } from 'qrcanvas'
import { Checkbox } from '@/components/ui/checkbox'
import NextImage from 'next/image'

const DEFAULT_OPTIONS: QRCanvasOptions = {
    background: 'white',
    foreground: 'black',
    typeNumber: 0,
    correctLevel: 'L',
    data: '',
    padding: 2,
    resize: true,
}

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

const formSchema = z.object({
    text: z.string(),
    size: z.number().min(8).max(40).default(8),
    padding: z.number().min(0).max(40).default(2),
    effectType: z.enum([`round`, `fusion`, `spot`, 'none']).default('none'),
    effectValue: z.number().min(0).max(100),
    addLogo: z.boolean().default(false).optional(),
    logoText: z.boolean().default(false).optional(),
    logo: z
        .object({
            imageRef: z.custom<HTMLImageElement>().optional(),
            text: z.string().optional(),
        })
        .optional(),
})

function QrMaker() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const logoImgRef = useRef<HTMLImageElement>(null)
    const [options, setOptions] = useState<QRCanvasOptions>(DEFAULT_OPTIONS)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: '',
            size: 8,
            effectType: 'none',
            effectValue: 100,
            padding: 2,
        },
    })

    useEffect(() => {
        setOptions({
            canvas: canvasRef.current || undefined,
        })
    }, [])

    return (
        <div className="flex flex-col md:flex-row space-x-4 container">
            <div className="flex-1">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        onValueChange={field.onChange}
                                        max={40}
                                        min={8}
                                        step={1}
                                        className="pb-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="padding"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        onValueChange={field.onChange}
                                        max={40}
                                        min={0}
                                        step={1}
                                        className="pb-4"
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="effectType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1 pb-4"
                                    >
                                        <EffectFormRadioGroupItem value="none" />
                                        <EffectFormRadioGroupItem value="round" />
                                        <EffectFormRadioGroupItem value="fusion" />
                                        <EffectFormRadioGroupItem value="spot" />
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="effectValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        onValueChange={field.onChange}
                                        max={100}
                                        step={1}
                                        className="pb-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="addLogo"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Add Logo</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    {form.watch('addLogo') && (
                        <FormField
                            control={form.control}
                            name="logoText"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Add Logo</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}
                    <FormControl>
                        <Input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                                e.preventDefault()
                                if (
                                    e.target.files &&
                                    e.target.files.length !== 0
                                ) {
                                    logoImgRef.current.src =
                                        URL.createObjectURL(e.target.files[0])
                                }
                            }}
                        />
                    </FormControl>
                </Form>
            </div>
            <div className="flex-1">
                <QRCanvas
                    options={{
                        ...options,
                        cellSize: form.watch('size') || 16,
                        data: form.watch('text'),
                        size: form.watch('size') + form.watch('padding') * 2,
                        padding: 16,
                        effect: {
                            type: form.watch('effectType') || 'none',
                            value: form.watch('effectValue') / 100,
                        },
                    }}
                    className="border"
                />
            </div>
        </div>
    )
}

export default QrMaker

function EffectFormRadioGroupItem({ value }: { value: string }) {
    return (
        <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
                <RadioGroupItem value={value} />
            </FormControl>
            <FormLabel className="font-normal capitalize">{value}</FormLabel>
        </FormItem>
    )
}

function AddLogoFormField({
    logoText,
    form,
}: {
    logoText: boolean
    form: any
}) {
    return (
        <>
            <NextImage
                ref={logoImgRef}
                alt="logo"
                src={logoImgRef.current?.src || ''}
                fill
            />
            <FormField  />
        </>
    )
}
